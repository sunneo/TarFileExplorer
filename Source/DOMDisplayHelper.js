
class DOMDisplayHelper
{
	static tarFileEntryToDOMElement(tarFileEntry)
	{
		var d = document;

		var returnValue = d.createElement("tr");

		var header = tarFileEntry.header;

		var td = d.createElement("td");
		td.style = "word-break: break-all";
		td.innerHTML = header.fileName;
		returnValue.appendChild(td);

		var td = d.createElement("td");
		td.innerHTML = header.typeFlag.name;
		returnValue.appendChild(td);

		var td = d.createElement("td");
		td.innerHTML = header.fileSizeInBytes;
		returnValue.appendChild(td);

		var td = d.createElement("td");

		var headerTypeFlagName = header.typeFlag.name;
		var tarFileTypeFlags = TarFileTypeFlag.Instances();
		if (headerTypeFlagName == tarFileTypeFlags.Normal)
		{
			var buttonDownload = d.createElement("button");
			buttonDownload.innerHTML = "Download";
			buttonDownload.onclick = tarFileEntry.download.bind(tarFileEntry);
			td.appendChild(buttonDownload);
		}

		returnValue.appendChild(td);

		var td = d.createElement("td");
		var buttonDelete = d.createElement("button");
		buttonDelete.innerHTML = "Delete";
		buttonDelete.onclick = () =>
		{
			var tarFile = Globals.Instance.tarFile;
                        tarFile.entries.splice(tarFile.entries.indexOf(tarFileEntry),1);
			divTarFileRefresh(); // hack - ui event handler
		}
		td.appendChild(buttonDelete);

		returnValue.appendChild(td);

		return returnValue;
	}

	static tarFileToDOMElement(tarFile)
	{
		var d = document;
		var returnValue = d.createElement("div");

		var pFileName = d.createElement("p");
		pFileName.innerHTML = tarFile.fileName;
		returnValue.appendChild(pFileName);

		var tableEntries = d.createElement("table");
		tableEntries.style.border = "1px solid";

		var thead = d.createElement("thead");

		var th = d.createElement("th");
		th.innerHTML = "File Name";
		th.style.border = "1px solid";
		thead.appendChild(th);

		var th = d.createElement("th");
		th.innerHTML = "Type";
		th.style.border = "1px solid";
		thead.appendChild(th);

		th = d.createElement("th");
		th.innerHTML = "Size in Bytes";
		th.style.border = "1px solid";
		thead.appendChild(th);

		tableEntries.appendChild(thead);

		for (var i = 0; i < tarFile.entries.length; i++)
		{
			var entry = tarFile.entries[i];
			var domElementForEntry = DOMDisplayHelper.tarFileEntryToDOMElement(entry);
			tableEntries.appendChild(domElementForEntry);
		}

		returnValue.appendChild(tableEntries);

		return returnValue;
	}

}
